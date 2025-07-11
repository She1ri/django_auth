import React from "react";
import { Table, Button, Popconfirm, message, Card, Typography, Space } from "antd";
import { useGetAllProductsQuery, useDeleteProductMutation } from "../../services/apiProduct";
import { useNavigate } from "react-router-dom";
 
const { Title } = Typography;
 
const ProductListPage: React.FC = () => {
    // Виводимо всі продукти
    const { data: products, isLoading, error, refetch } = useGetAllProductsQuery();
    const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
    const navigate = useNavigate();
 
    const handleEdit = (id: number) => {
        navigate(`/products/edit/${id}`);
    };
 
    const handleDelete = async (id: number) => {
        try {
            await deleteProduct(id).unwrap();
            message.success("Товар видалено");
            refetch();
        } catch (e) {
            message.error("Помилка при видаленні");
        }
    };
 
    return (
        <Card style={{ maxWidth: 900, margin: "20px auto" }}>
            <Space direction="vertical" style={{ width: "100%" }}>
                <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
                    Список продуктів
                </Title>
                <Button type="primary" onClick={() => navigate("/products/create")}>Додати продукт</Button>
                <Table
                    dataSource={products || []}
                    rowKey="id"
                    loading={isLoading}
                    columns={[
                        { title: "ID", dataIndex: "id", key: "id" },
                        { title: "Назва", dataIndex: "name", key: "name" },
                        { title: "Опис", dataIndex: "description", key: "description" },
                        { title: "Ціна", dataIndex: "price", key: "price" },
                        {
                            title: "Дії",
                            key: "actions",
                            render: (_, record) => (
                                <Space>
                                    <Button onClick={() => handleEdit(record.id)}>Редагувати</Button>
                                    <Popconfirm
                                        title="Видалити продукт?"
                                        onConfirm={() => handleDelete(record.id)}
                                        okText="Так"
                                        cancelText="Ні"
                                    >
                                        <Button danger loading={isDeleting}>Видалити</Button>
                                    </Popconfirm>
                                </Space>
                            ),
                        },
                    ]}
                />
            </Space>
        </Card>
    );
};
 
export default ProductListPage;