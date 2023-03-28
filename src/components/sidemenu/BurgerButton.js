import styled from "styled-components";

function BurgerButton(props) {
  return (
    <StyledBurger>
      {/* Cuando hagamos click, se ejecuta la función handleClick y cambia el
      estado de clicked a true o false */}
      <div
        onClick={props.handleClick}
        className={`hamburger ${props.clicked ? "is-active" : ""}`}
        id="hamburger-1"
      >
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </div>
    </StyledBurger>

  );
}

export default BurgerButton;

const StyledBurger = styled.button`
#hamburger-1 {
  background-color: #e5f0ed;
// @media (min-width: 992px) {
// background-color: #000;
}

div#hamburger-1.hamburger{
  top: -30px;

  // @media (min-width: 992px) {
  //   margin-left: -300px;
  // }
}
  // .row .three {
  //   padding: 80px 30px;
  //   -webkit-box-sizing: border-box;
  //   -moz-box-sizing: border-box;
  //   box-sizing: border-box;
  //   color: black;
  // }

  .hamburger .line {
    width: 30px;
    height: 4px;
    background-color: #2c3e50;
    display: block;
    margin: 8px auto;
    -webkit-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    position: relative;
    left: 315px;
    top: 30px;

    // @media (min-width: 992px) {
    // color: #fff;
    // font-size: 1.5rem;
    
    
    }


  #hamburger-1.is-active .line:nth-child(2) {
    opacity: 0;

  }

  #hamburger-1.is-active .line:nth-child(1) {
    -webkit-transform: translateY(13px) rotate(45deg);
    -ms-transform: translateY(13px) rotate(45deg);
    -o-transform: translateY(13px) rotate(45deg);
    transform: translateY(13px) rotate(45deg);

  }

  #hamburger-1.is-active .line:nth-child(3) {
    -webkit-transform: translateY(-13px) rotate(-45deg);
    -ms-transform: translateY(-13px) rotate(-45deg);
    -o-transform: translateY(-13px) rotate(-45deg);
    transform: translateY(-13px) rotate(-45deg);
  }
  @media (min-width: 821px) {
    background-color: #e5f0ed;
    display: none;
  }

    background-color: #e5f0ed;

`;
