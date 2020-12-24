

const Footer = ()=>{
    return(
        <footer id="footer-size">
        <div className="waves">
            <svg width="100%" height="200px" fill="none">
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2a2a72" />
                    <stop offset="74%" stopColor="#009ffd" />
                    <stop offset="74%" stopColor="#009ffd" />
                </linearGradient>
                <path fill="url(#grad1)"
                      d="
                        M 0 67
                        C 273,183
                          822,-40
                          1920,106

                        V 359
                        H 0
                        V 67
                        Z">
                    <animate repeatCount="indefinite"
                             fill="#454599"
                             attributeName="d"
                             dur="15s"
                             values="
                          M0 77
                          C 473,283
                            822,-40
                            1920,116

                          V 359
                          H 0
                          V 67
                          Z;

                          M0 77
                          C 473,-40
                            1222,283
                            1920,136

                          V 359
                          H 0
                          V 67
                          Z;

                          M0 77
                          C 973,260
                            1722,-53
                            1920,120

                          V 359
                          H 0
                          V 67
                          Z;

                          M0 77
                          C 473,283
                            822,-40
                            1920,116

                          V 359
                          H 0
                          V 67
                          Z
                          ">
                    </animate>
                </path>
            </svg>
        </div>

    </footer>
    );
}


export default Footer;