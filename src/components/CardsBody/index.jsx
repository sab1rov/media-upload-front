import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Image,
  Modal,
  Pagination,
  Row,
  Select,
  message,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useLoad, usePostRequest } from "../../hooks/request";
import { deleteUrl } from "../../utils/url";
import { projectData } from "../../utils/data";
import FullPageLoader from "../../utils/FullPageLoader";

const CardsBody = () => {
  const [key, setKey] = useState(null);
  const [selectValue, setSelectValue] = useState("datatalim");
  const [deleteModal, setDeleteModal] = useState(false);

  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams({});
  console.log(search);

  const imageListRequest = useLoad(
    {
      url: selectValue + search,
    },
    [search]
  );
  const deleteImageRequest = usePostRequest({ url: deleteUrl });
  const { loading: getLoading, response } = imageListRequest;
  const { loading: deleteLoading } = deleteImageRequest;
  const imageList = response && response?.files;
  const page = response && response?.page;
  console.log(page);

  const openDeleteModal = (value) => {
    setKey(value);
    setDeleteModal(true);
  };

  const handleChangeSelect = (value) => {
    setSelectValue(value);
  };

  const pageTo = (to) => {
    searchParams.set("page", to);
    setSearchParams(searchParams);
  };

  function cancelDeleteModal() {
    setDeleteModal(false);
    setKey(null);
  }

  async function handleBrandDeleteBtn() {
    let { success } = await deleteImageRequest.request({ data: { key: key } });
    if (success) {
      imageListRequest.request();
      setKey(null);
      setDeleteModal(false);
      message.success("Image successfully deleted");
    }
  }

  useEffect(() => {
    imageListRequest.request();
  }, [selectValue]);

  return (
    <>
      <Select
        style={{ width: 300 }}
        options={projectData}
        onChange={(e) => handleChangeSelect(e)}
        defaultValue={selectValue}
      />

      <Modal
        title="Are you sure to delete this image"
        centered
        open={deleteModal}
        onOk={() => handleBrandDeleteBtn()}
        onCancel={cancelDeleteModal}
        footer={[
          <Button onClick={cancelDeleteModal} disabled={deleteLoading} key={1}>
            No
          </Button>,
          <Button
            onClick={handleBrandDeleteBtn}
            danger
            loading={deleteLoading}
            key={2}
          >
            Yes
          </Button>,
        ]}
      ></Modal>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ marginTop: 24 }}>
        {getLoading ? (
          <FullPageLoader />
        ) : (
          imageList?.map((item, i) => {
            return (
              <Col span={6} key={i} style={{ marginBottom: "30px" }}>
                <Card
                  bordered={false}
                  cover={
                    <Image
                      alt="example"
                      src={item?.url}
                      style={{
                        height: "150px",
                        padding: "10px",
                        objectFit: "contain",
                        margin: "0 auto",
                      }}
                    />
                  }
                  actions={[
                    <Button
                      style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        boxShadow: "unset",
                      }}
                      key="delete"
                      onClick={() => openDeleteModal(item?.key)}
                    >
                      <DeleteOutlined />
                    </Button>,
                  ]}
                ></Card>
              </Col>
            );
          })
        )}
      </Row>
      {getLoading ? (
        <FullPageLoader />
      ) : (
        <Pagination
          total={response?.total}
          defaultCurrent={1}
          current={page}
          defaultPageSize="12"
          showSizeChanger={false}
          onChange={(to) => pageTo(to)}
        />
      )}
    </>
  );
};

export default CardsBody;
