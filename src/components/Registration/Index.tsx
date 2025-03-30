import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography } from 'antd';
import styles from './styles.module.scss';
export const Registration = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { Link } = Typography;
    const onFinish = () => {
        console.log('Succes');
    }
    return (
        <div className={styles.containerAuthorization}>
            <div className={styles.formContainer}>
            <h3>Регистрация</h3>
            <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            style={{ margin: 5}}
            >
                 <Form.Item
                    style={{ margin: 0, marginBottom: 9}}
                    >
                    <Input
                    placeholder='Ваше имя'/>
                </Form.Item>
                <Form.Item
                    style={{ margin: 0, marginBottom: 9}}
                    >
                    <Input
                    placeholder='Логин'/>
                </Form.Item>
                
                <Form.Item
                style={{ marginBottom: 9}}
                >
                    <Input
                    placeholder='Пароль'/>
                </Form.Item>
                <div className={styles.linked}>
                    <Link onClick={() => navigate('/profile')}style={{ color: 'black', opacity: 0.5 }}>Уже зарегистрированы?</Link>
                </div>
                <Button 
                        className={styles.button}
                        // type="primary"
                        size="middle"
                        style={{ margin: '0 auto', display: 'block' }}
                    >
                        Зарегистрироваться
                </Button>
            </Form>
        </div>
    </div>
    );
}