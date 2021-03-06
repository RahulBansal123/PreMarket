// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Market is Ownable {

    // Struct for storing each information market
    struct Information{
        uint256 id;
        string title;
        string description;
        string resolveUrl;
        uint256 startTimestamp;
        uint256 endTimestamp;
        uint256 totalUpValue;
        uint256 totalDownValue;
        uint256 resolved; // 0: not resolved, 1: resolved
    }

    // Struct for storing amount invested
    struct Amount {
        address user;
        uint256 value;
        uint256 timestamp;
    }

    // Address of PreToken
    address public preToken;

    // Total information market groups created
    uint256 public totalInformation = 0;

    // Mapping of information market id to information market
    mapping(uint256 => Information) public informations;

    // Mapping of information market id to upvotes/downvotes
    mapping(uint256 => Amount[]) public upVotes;
    mapping(uint256 => Amount[]) public downVotes;

    // Events
    event InformationAdded(
        uint256 indexed id,
        string indexed title,
        string description
    );

    // Modifier to check for validity of the id
    modifier isValidId(uint256 _id) {
        require(_id != 0 && _id <= totalInformation, "Invalid id");
        _;
    }

    constructor(address _preToken) {
        preToken = _preToken;
    }

    // Function for gas optimization
    function unsafe_inc(uint256 x) private pure returns (uint256) {
        unchecked { return x + 1; }
    }

    // Return the owner
    function isOwner() public view returns (bool _isOwner) {
        if (msg.sender == owner()) return true;
        return false;
    }

    // Function for creating a new information market
    function addInformation(
        string memory _title,
        string memory _description,
        string memory _resolveUrl,
        uint256 _endTimestamp
    ) public onlyOwner{
        totalInformation = unsafe_inc(totalInformation);

        informations[totalInformation] = Information({
            id: totalInformation,
            title: _title,
            description: _description,
            resolveUrl: _resolveUrl,
            startTimestamp: block.timestamp,
            endTimestamp: _endTimestamp,
            totalUpValue: 0,
            totalDownValue: 0,
            resolved: 0
        });

        emit InformationAdded(
            totalInformation,
            _title,
            _description
        );
    }

    // Function for voting a information market group
    function vote(uint256 _id, uint256 _value ,bool _isUpVote) public payable {
        Information storage information = informations[_id];
        ERC20(preToken).transferFrom(payable(msg.sender), address(this), _value);

        Amount memory valueCreated = Amount(
            msg.sender,
            _value,
            block.timestamp
        );

        if (_isUpVote) {
            information.totalUpValue += _value;
            upVotes[_id].push(valueCreated);
        } else {
            information.totalDownValue += _value;
            downVotes[_id].push(valueCreated);
        }
    }


    // Function for getting information market
    function getInformation(uint256 _id)
        public
        view
        returns (string memory, string memory, Amount[] memory, Amount[] memory)
    {
        Information memory information = informations[_id];
        return (information.title, information.description, upVotes[_id], downVotes[_id]);
    }

    // Function for distributing the rewards
    function distribute(uint256 _id, bool isSuccessfull)
        public
        payable onlyOwner isValidId(_id)
    {
        Information storage information = informations[_id];
        uint256 totalUpValue = information.totalUpValue;
        uint256 totalDownValue = information.totalDownValue;

        if (isSuccessfull) {
            uint256 totalUpvotes = upVotes[_id].length;
            for (uint256 i = 0; i < totalUpvotes;  i = unsafe_inc(i)) {
                uint256 investedAmount = upVotes[_id][i].value;

                uint256 extraAmount = (totalDownValue * investedAmount) / totalUpValue;

                ERC20(preToken).transfer(payable(upVotes[_id][i].user), investedAmount + extraAmount);
            }
        } else {
            uint256 totalDownvotes = downVotes[_id].length;
            for (uint256 i = 0; i < totalDownvotes; i = unsafe_inc(i)) {
                uint256 investedAmount = downVotes[_id][i].value;

                uint256 extraAmount = (totalUpValue * investedAmount) / totalDownValue;

                ERC20(preToken).transfer(payable(downVotes[_id][i].user), investedAmount + extraAmount);
            }
        }

        information.resolved = 1;
    }
}
