import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { Field, Form, Formik } from "formik"
import { NavLink, useNavigate } from "react-router-dom"
import { toFormikValidationSchema } from "zod-formik-adapter"
import { login } from "../services/auth.service"
import { User, UserLoginDTO } from "../shared/data-access/api/models/user"
import { useAuthStore } from "../shared/data-access/store/auth.store"
import { LoginValidationSchema } from "../shared/data-access/zod-schema"
import { ErrorList } from "../shared/ui/error-list"

const initialValues: UserLoginDTO = {
  email: "",
  password: "",
}

export const Login = () => {
  const navigate = useNavigate()
  const useAuth = useAuthStore();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: login,
    onSuccess: (data: { user: User }) => {
      useAuth.setAuthState(data.user, true)
      navigate("/")
    }
  })

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <NavLink to="/register">Need an account?</NavLink>
            </p>

            {isError && <ErrorList errors={((error as AxiosError).response?.data as any)?.errors} />}

            <Formik
              initialValues={initialValues}
              validationSchema={toFormikValidationSchema(LoginValidationSchema)}
              onSubmit={(user) => mutate({ user: user })}
            >
              {
                ({ errors, touched }) => (
                  <Form>
                    <fieldset className="form-group" disabled={isPending}>
                      <Field name="email" className="form-control form-control-lg" type="email" placeholder="Email" />
                      {errors.email && touched.email ? <span>{errors.email}</span> : null}
                    </fieldset>
                    <fieldset className="form-group" disabled={isPending}>
                      <Field name="password" className="form-control form-control-lg" type="password" placeholder="Password" />
                      {errors.password && touched.password ? <span>{errors.password}</span> : null}
                    </fieldset>
                    <button className="btn btn-lg btn-primary pull-xs-right" type="submit" disabled={isPending}>Se connecter</button>
                  </Form>
                )
              }
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}
