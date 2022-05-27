export function getWalletIcon(wallet: string) {
  switch (wallet) {
    case 'metamask':
      return '/assets/images/metamask.png';
    case 'walletconnect':
      return '/assets/images/walletConnectIcon.svg';
    case 'walletlink':
      return '/assets/images/coinbaseWalletIcon.svg';
    case 'coinbaselink':
      return '/assets/images/coinbaseWalletIcon.svg';
    case 'fortmatic':
      return '/assets/images/fortmaticIcon.png';
    case 'portis':
      return '/assets/images/portisIcon.png';
    case 'injected':
    default:
      return '/assets/images/arrow-right.svg';
  }
}
