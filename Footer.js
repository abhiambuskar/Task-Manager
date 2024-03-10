import React from 'react'
import {Link} from 'react-router-dom'
import  './Body.css'

const Footer = () => {
  return (
    <>


    <footer className="footer fluid">
          <div className="row">
            <div className="footer-col">
              <h4>company</h4>
              <ul>
                <li><Link to="/">about us</Link></li>
                <li><Link to="/">our services</Link></li>

              </ul>
            </div>
            <div className="footer-col">
              <h4>get help</h4>
              <ul>
                <li><Link to="/">FAQ</Link></li>
                <li><Link to="/">shipping</Link></li>

              </ul>
            </div>
            <div className="footer-col">
              <h4>Cars</h4>
              <ul>
                <li><Link to="/">Skoda</Link></li>
                <li><Link to="/">Volkswagen</Link></li>

              </ul>
            </div>
            <div className="footer-col">
              <h4>follow us</h4>
              <div className="social-links">
                <Link to="/"><i className="fab fa-facebook-f"></i></Link>
                <Link to="/"><i className="fab fa-twitter"></i></Link>
                <Link to="/"><i className="fab fa-instagram"></i></Link>
                <Link to="/"><i className="fab fa-linkedin-in"></i></Link>
              </div>
            </div>
          </div>
     </footer>

    </>
  )
}

export default Footer