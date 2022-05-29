import { X, Facebook, Twitter, Instagram, Linkedin } from 'react-feather';

const Modal = ({ isOpen, id, onClose }) => {
  return (
    <div class={`popup ${isOpen ? 'show' : ''}`} style={{ zIndex: 99999 }}>
      <header>
        <span style={{ fontWeight: 600 }}>Share</span>
        <div class="close" onClick={onClose}>
          <X className="stroke-[#0000ff9b] hover:stroke-[#0000FF] cursor-pointer" />
        </div>
      </header>
      <div class="content">
        <p>Share this market group's link via</p>
        <ul class="icons">
          <a
            href={`https://www.facebook.com/sharer.php?u=${process.env.NEXT_PUBLIC_HOST_URL}/${id}`}
            className="border-2 border-[#b7d4fb] hover:scale-110"
          >
            <Facebook className="stroke-2 stroke-[#1877F2] cursor-pointer" />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${process.env.NEXT_PUBLIC_HOST_URL}/${id}&text=Check+this+out&hashtags=PreMarket`}
            className="border-2 border-[#b6e7fc] hover:scale-110"
          >
            <Twitter className="stroke-2 stroke-[#46C1F6] cursor-pointer" />
          </a>
          <a
            href={`https://www.facebook.com/sharer.php?u=${process.env.NEXT_PUBLIC_HOST_URL}/${id}`}
            className="border-2 border-[#f5bccf] hover:scale-110"
          >
            <Instagram className="stroke-2 stroke-[#e1306c] cursor-pointer" />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${process.env.NEXT_PUBLIC_HOST_URL}/${id}`}
            className="border-2 border-[#b3e6ff] hover:scale-110"
          >
            <Linkedin className="stroke-2 stroke-[#0088cc] cursor-pointer" />
          </a>
        </ul>
        <p>Or copy link</p>
        <div class="field">
          <i class="url-icon uil uil-link"></i>
          <input
            type="text"
            readonly
            value={process.env.NEXT_PUBLIC_HOST_URL + '/' + id}
            className="w-full h-full"
          />
          <button
            className="w-1/3 h-full bg-blue-100 text-blue-500 hover:text-blue-600"
            onClick={() =>
              navigator.clipboard.writeText(
                process.env.NEXT_PUBLIC_HOST_URL + '/' + id
              )
            }
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
