import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Button, message, Card, Typography, Space } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProductQuery, useUpdateProductMutation } from "../../services/apiProduct";
import ImageUploadFormItem from "../../components/ui/form/ImageUploadFormItem";
 
const { Title } = Typography;
 
const EditProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: product, isLoading } = useGetProductQuery(Number(id));
    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
    const [form] = Form.useForm();
    const [images, setImages] = useState<File[]>([]);
 
    useEffect(() => {
        if (product) {
            form.setFieldsValue({
                name: product.name,
                slug: product.slug,
                description: product.description,
                price: product.price,
            });
        }
    }, [product, form]);
 
    const onFinish = async (values: any) => {
        try {
            const formData = new FormData();
            formData.append("id", id!);
            formData.append("name", values.name);
            formData.append("slug", values.slug);
            formData.append("description", values.description || "");
            formData.append("price", values.price?.toString() || "0");
            formData.append("category", product.category.toString());
            images.forEach((file) => {
                formData.append("uploaded_images", file);
            });
            await updateProduct(formData as any).unwrap();
            message.success("Товар оновлено успішно!");
            navigate(-1);
        } catch (error) {
            message.error("Помилка при оновленні товару");
        }
    };
 
    return (
        <Card style={{ maxWidth: 600, margin: "20px auto" }}>
            <Space direction="vertical" style={{ width: "100%" }}>
                <Button onClick={() => navigate(-1)} type="default" style={{ width: 80 }} aria-label="Назад">Назад</Button>
                <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
                    Редагування товару
                </Title>
                <Form
                    form={form}
                    name="edit-product"
                    onFinish={onFinish}
                    initialValues={{
                        name: product?.name || "",
                        slug: product?.slug || "",
                        description: product?.description || "",
                        price: product?.price || 0,
                    }}
                    scrollToFirstError
                >
                    <Form.Item label="Назва" name="name" rules={[{ required: true, message: "Введіть назву!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Слаг" name="slug" rules={[{ required: true, message: "Введіть слаг!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Опис" name="description">
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item label="Ціна" name="price" rules={[{ required: true, message: "Введіть ціну!" }]}>
                        <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item label="Фотографії" name="images">
                        <ImageUploadFormItem
                            multiple
                            fileList={images.map((file) => ({
                                uid: file.name,
                                name: file.name,
                                url: URL.createObjectURL(file),
                            }))}
                            onChange={(fileList) => {
                                setImages(fileList.map((file) => file.originFileObj as File));
                            }}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={isUpdating} block>
                            Оновити товар
                        </Button>
                    </Form.Item>
                </Form>
            </Space>
        </Card>
    );
};
 
export default EditProductPage;
 