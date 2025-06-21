import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAuthStore } from "../context/useAuthStore";
import { useNavigate } from "react-router";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W_]{8,}$/;

type Field<T> = {
  value: T;
  isValid: boolean;
  errorMessage?: string;
};

interface FormData {
  email: Field<string>;
  password: Field<string>;
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email: {
      value: "",
      isValid: false,
    },
    password: {
      value: "",
      isValid: false,
    },
  });

  const { authenticate } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    const isValidPassword = PASSWORD_REGEX.test(formData.password.value);

    setFormData((prevData) => ({
      ...prevData,
      password: {
        ...prevData.password,
        isValid: isValidPassword,
        errorMessage: isValidPassword
          ? ""
          : `Password must be at least 8 characters long
            and contain at least one uppercase letter, one lowercase letter
            one number, and one special character.`,
      },
    }));
  }, [formData.password.value]);

  useEffect(() => {
    const isValidEmail = EMAIL_REGEX.test(formData.email.value);

    setFormData((prevData) => ({
      ...prevData,
      email: {
        ...prevData.email,
        isValid: isValidEmail,
        errorMessage: isValidEmail ? "" : "Please enter a valid email",
      },
    }));
  }, [formData.email.value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData: FormData) => ({
      ...prevData,
      [name]: {
        ...prevData[name as keyof FormData],
        value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await authenticate({
      email: formData.email.value,
      password: formData.password.value,
    });

    navigate("/");
  };

  return (
    <div className="w-50 mx-auto">
      <h1 className="my-4">Login Page</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={formData.email.value}
            name="email"
            placeholder="Enter email"
            onChange={handleChange}
          />
          {!formData.email.isValid && formData.email.value && (
            <Form.Text className="text-danger">
              {formData.email.errorMessage}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={formData.password.value}
            name="password"
            onChange={handleChange}
            placeholder="Password"
          />
          {!formData.password.isValid && formData.password.value && (
            <Form.Text className="text-danger">
              {formData.password.errorMessage}
            </Form.Text>
          )}
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={!formData.email.isValid || !formData.password.isValid}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};
export default Login;
