import Main from '../containers/main';

function Home(props) {
  return <Main account={props.account} marketContract={props.marketContract} />;
}
export default Home;
