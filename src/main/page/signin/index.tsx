import styles from "./index.module.scss";
import clsx from "clsx";
import OiaSvg from "@assets/media/oia.svg?react";
import type {Sign} from "../../api/signin/models.ts";
import {Form, useForm} from "react-hook-form";

export default function Signin() {
    const {register, control, formState} = useForm<Sign>();
    return (<section className={"d-flex flex-center flex-col w-100 h-100"}>
        <OiaSvg className={formState.isSubmitting ? styles.rotate : ""}
                width={200} height={200} viewBox="0 0 1444 1448"/>
        <article className={clsx("mt-14 pb-20", styles.signinContainer)}>
            <Form className={"d-flex flex-col gap-6"}
                  control={control}
                  action={"/signin"}
                  method={"post"}
                  onSubmit={async () => {
                      await new Promise((resolve) => setTimeout(resolve, 5000));
                  }}>
                <input className={"large"}
                       type={"text"}
                       placeholder={"이름"}
                       autoComplete={"username"}
                       disabled={formState.isSubmitting}
                       {...register("username", {required: true})}/>
                <input className={clsx("large", !formState.errors ? "invalid" : "")}
                       type={"password"}
                       placeholder={"비밀번호"}
                       autoComplete={"current-password"}
                       disabled={formState.isSubmitting}
                       {...register("password", {required: true})}/>
                <button type={"submit"} disabled={!formState.isValid || formState.isSubmitting}>로그인</button>
            </Form>
        </article>
    </section>);
}