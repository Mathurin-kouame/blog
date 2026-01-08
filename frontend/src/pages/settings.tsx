import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { Field, Form, Formik } from "formik"
import { useNavigate } from "react-router-dom"
import { updateUser } from "../services/user.service"
import { useAuthStore } from "../shared/data-access/store/auth.store"
import { ErrorList } from "../shared/ui/error-list"

export const Settings = () => {
  const { user, setUser, setAuthState } = useAuthStore();
  const initialValues = {
    image: user?.image ?? "",
    bio: user?.bio ?? "",
    username: user?.username ?? "",
    password: "",
    email: user?.email ?? ""
  }

  const navigate = useNavigate()

  const { isPending, mutate, isError, error } = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      console.log(data.user)
      setUser(data.user)
      navigate("/")
    }
  })
  console.log(error)

  const handleLogout = () => {
    setAuthState(undefined, false)
    navigate("/login")
  }

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            {isError && ((error as AxiosError).response?.data as any)?.errors?.length > 0 && <ErrorList errors={((error as AxiosError).response?.data as any)?.errors} />}
            <Formik
              initialValues={initialValues}
              onSubmit={(user) => mutate({ user })}
            >
              <Form>
                <fieldset>
                  <fieldset className="form-group">
                    <Field name="image" className="form-control" type="text" placeholder="URL of profile picture" />
                  </fieldset>
                  <fieldset className="form-group">
                    <Field name="username" className="form-control form-control-lg" type="text" placeholder="Your Name" />
                  </fieldset>
                  <fieldset className="form-group">
                    <Field name="bio" as="textarea"
                      className="form-control form-control-lg"
                      rows={8}
                      placeholder="Short bio about you"
                    ></Field>
                  </fieldset>
                  <fieldset className="form-group">
                    <Field name="email" className="form-control form-control-lg" type="text" placeholder="Email" />
                  </fieldset>
                  <fieldset className="form-group">
                    <Field
                      name="password"
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="New Password"
                    />
                  </fieldset>
                  <button className="btn btn-lg btn-primary pull-xs-right" type="submit">Update Settings</button>
                </fieldset>
              </Form>
            </Formik>
            <button className="btn btn-outline-danger" onClick={handleLogout}>Or click here to logout.</button>
          </div>
        </div>
      </div>
    </div>
  )

}
