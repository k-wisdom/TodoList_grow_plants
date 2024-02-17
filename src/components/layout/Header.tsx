import React from "react";
import { useNavigate } from "react-router";
import { ContentWrap } from "../../styles/styles";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../Logo";

const HeaderBox = styled.header`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  padding: 1rem 0;
  height: 3.5rem;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 4px 16px 0 rgba(40, 44, 47, 0.1);
  z-index: 9999;
  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  nav {
    li {
      display: inline-block;
      margin-right: 2rem;
      font-size: 0.8rem;
    }
  }
  .btn_logout {
    margin-top: 3px;
    font-size: 0.8rem;
    background: transparent;
    text-decoration: underline;
  }

  .logo {
    display: block;
    font-size: 0.8rem;
    font-weight: bold;
    color: #5ab380;
    h1 {
      display: inline-block;
    }
  }
`;

const RightContent = styled.div`
  display: flex;
  align-items: center;
`;

export default function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/signin");
  };
  return (
    <HeaderBox>
      <ContentWrap>
        <Link to="/" className="logo">
          <Logo size="2rem" />
          TodoList
        </Link>
        <RightContent>
          <nav>
            <ul>
              <li>
                <Link to="/myPlants">나의 식물</Link>
              </li>
            </ul>
          </nav>
          <button className="btn_logout" onClick={logout}>
            로그아웃
          </button>
        </RightContent>
      </ContentWrap>
    </HeaderBox>
  );
}
