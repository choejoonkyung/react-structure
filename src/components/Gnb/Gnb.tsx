import React, { useCallback, useMemo } from "react";
import { css } from "@emotion/react";
import { Link, useLocation } from "react-router-dom";

type GnbMenu = {
  title: string;
  path: string;
};

type GnbProps = {};

function Gnb({}: GnbProps) {
  const location = useLocation();

  const gnbMenus: GnbMenu[] = useMemo(
    () => [
      {
        title: "Home",
        path: "/",
      },
      {
        title: "Music Search",
        path: "/music/search",
      },
      {
        title: "Error",
        path: "/error",
      },
    ],
    []
  );

  const checkActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  return (
    <nav>
      <ul css={gnbStyle}>
        {gnbMenus.map((menu, i) => (
          <li>
            <Link
              key={`gnb-menu-${i + 1}`}
              css={gnbMenuStyle(checkActive(menu.path))}
              to={menu.path}
            >
              {menu.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const gnbStyle = css`
  display: flex;
  list-style: none;
  background-color: #e8e8e8;
  padding: 14px;
  li {
    &:before {
      content: " | ";
      font-weight: 400;
    }
    &:first-child {
      &:before {
        content: "";
      }
    }
  }
`;

const gnbMenuStyle = (active: boolean) => css`
  text-decoration: none;
  font-size: 18px;
  color: black;
  padding: 5px;
  font-weight: ${active ? 800 : 400};
  cursor: pointer;
`;

export default Gnb;
