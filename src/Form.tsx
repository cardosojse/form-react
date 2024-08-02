import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = Yup.object().shape({
  fullName: Yup.string().required("Campo obrigatório"),
  username: Yup.string().required("Campo obrigatório"),
  email: Yup.string()
    .email("O email é inválido ou já foi utilizado")
    .required("Campo obrigatório"),
  password: Yup.string()
    .min(5, "A senha deve ter pelo menos 5 caracteres")
    .required("Campo obrigatório"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "As senhas não coincidem")
    .required("Campo obrigatório"),
});

function Formulario() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => console.log("submit", data);

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h2>Form</h2>
        <div className="form-fields">
          <label>
            NOME:
            <input
              {...register("fullName")}
              type="text"
              placeholder="Digite o seu nome"
            />
          </label>
          <span>{errors.fullName && errors.fullName.message}</span>
        </div>
        <div className="form-fields">
          <label>
            USUÁRIO:
            <input
              {...register("username")}
              type="text"
              placeholder="Digite o seu usuário"
            />
          </label>
          <span>{errors.username && errors.username.message}</span>
        </div>
        <div className="form-fields">
          <label>
            EMAIL:
            <input
              {...register("email")}
              type="email"
              placeholder="Digite o seu email"
            />
          </label>
          <span>{errors.email && errors.email.message}</span>
        </div>
        <div className="form-fields">
          <label>
            SENHA:
            <input
              {...register("password")}
              type="password"
              placeholder="Digite a sua senha"
            />
          </label>
          <span>{errors.password && errors.password.message}</span>
        </div>
        <div className="form-fields">
          <label>
            CONFIRME A SENHA:
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirme a sua senha"
            />
          </label>
          <span>
            {errors.confirmPassword && errors.confirmPassword.message}
          </span>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Formulario;
