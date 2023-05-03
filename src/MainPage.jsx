import React from "react";
import { Layout } from "antd";
import CardsBody from "./components/CardsBody";
const { Content } = Layout;

const MainPage = () => {
  return (
    <div className="container">
      <Layout style={{minHeight: 720}}>
        <Content style={{ padding: "24px" }}>
          <CardsBody />
        </Content>
      </Layout>
    </div>
  );
};

export default MainPage;
