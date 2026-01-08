import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { Field, Form, Formik } from "formik"
import { NavLink, useNavigate } from "react-router-dom"
import { toFormikValidationSchema } from "zod-formik-adapter"
import { register } from "../services/auth.service"
import { useAuthStore } from "../shared/data-access/store/auth.store"
import { RegisterValidationSchema } from "../shared/data-access/zod-schema"
import { ErrorList } from "../shared/ui/error-list"

const initialValues = {
  username: "",
  email: "",
  password: ""
}

export const Register = () => {
  const navigate = useNavigate()
  const { setAuthState } = useAuthStore()
  const { isPending, mutate, isError, error } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      setAuthState(data.user, true)
      navigate("/")
    }
  })

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Se connecter</h1>
            <p className="text-xs-center">
              <NavLink to="/login"> vous avez déjà compte ?</NavLink>
            </p>

            {isError && <ErrorList errors={((error as AxiosError).response?.data as any)?.errors} />}

            <Formik
              initialValues={initialValues}
              validationSchema={toFormikValidationSchema(RegisterValidationSchema)}
              onSubmit={(user) => mutate({ user })}
            >
              {
                ({ errors, touched }) => (
                  <Form>
                    <fieldset className="form-group" disabled={isPending}>
                      <Field name="username" className="form-control form-control-lg" type="text" placeholder="Username" />
                      {errors.username && touched.username ? <span>{errors.username}</span> : null}
                    </fieldset>
                    <fieldset className="form-group" disabled={isPending}>
                      <Field name="email" className="form-control form-control-lg" type="text" placeholder="Email" />
                      {errors.email && touched.email ? <span>{errors.email}</span> : null}
                    </fieldset>
                    <fieldset className="form-group" disabled={isPending}>
                      <Field name="password" className="form-control form-control-lg" type="password" placeholder="Password" />
                      {errors.password && touched.password ? <span>{errors.password}</span> : null}
                    </fieldset>
                    <button className="btn btn-lg btn-primary pull-xs-right">Sign up</button>
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
