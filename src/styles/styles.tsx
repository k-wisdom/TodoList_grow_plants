import { styled } from "styled-components";

export const CenterContentBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f5f5f5;
`;

export const TextCenter = styled.div`
  text-align: center;
`;

export const Title = styled.h2`
  margin-bottom: 2rem;
  font-size: 1.8rem;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const ContentWrap = styled.div`
  margin: 0 auto;
  width: min(50rem, calc(100% - 2.5rem));
  box-sizing: border-box;
`;

export const CardList = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap: 2rem;
  > figure{
    flex:1;
  }

  @media(max-width: 768px){
    gap: 1.25rem;
    flex-wrap:wrap;
    > figure{
      flex: auto;
      width: calc((100% - 1.25rem) / 2)
    }
  }
}
`;

export const Titleh3 = styled.h3`
  margin: 1rem 0;
  font-size: 1.5rem;
`;
export const Section = styled.section`
  margin: 3.125rem 0 6.25rem;
`;

export const ColorSection = styled(Section)`
  margin-bottom: 0;
  padding: 5rem 1.25rem;
  background: rgb(131 219 255 / 22%);
`;

export const Main = styled.main`
  padding-top: 3.4375rem;
`;

export const FormBox = styled.div`
  margin: 5rem 0;
  padding: 2rem;
  width: 20rem;
  background: #fff;
  box-shadow: 0 4px 16px 0 rgba(40, 44, 47, 0.1);
  border-radius: 1.25rem;
  button {
    margin-top: 4rem;
  }

  .login_etc {
    text-align: center;
    a {
      display: inline-block;
      margin-top: 2rem;
      text-decoration: underline;
      font-size: 0.8rem;
    }
  }

  i {
    display: block;
    margin-bottom: 0.2rem;
    font-size: 0.65rem;
    color: red;
    font-style: normal;
  }
`;
