import React from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import styles from "./Home.module.css";

const supabase = createClient(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_KEY
);

function Home() {
  const navigate = useNavigate();

  supabase.auth.onAuthStateChange(async (e) => {
    if (e !== "SIGNED_OUT") {
      navigate("/feed");
    } else {
      navigate("/");
    }
  });

  //       <h1 className={styles.h1}>BeGroovy</h1>
  return (
    <>
      <img className={styles.logo} src="BeGroovy.png" />

      <p className={styles.p}>
        An Oasis Project presented by Laith, Aaron, Kaito, Joey, and Vidyut
      </p>

      <img className={styles.img} src="illustration.svg" />

      <Auth
        // Only 3rd Party Providers?
        onlyThirdPartyProviders={true}
        supabaseClient={supabase}
        localization={{
          variables: {
            sign_up: {
              email_input_placeholder: "Email Address",
              password_input_placeholder: "Password",
            },
            sign_in: {
              email_label: "Enter your email address",
              password_label: "Enter your password",
              email_input_placeholder: "Email Address",
              password_input_placeholder: "Password",
            },
          },
        }}
        appearance={{
          style: {
            button: {
              background: "black",
              color: "white",
              width: "200px",
              position: "absolute",
              top: "410px",
              left: "225px",
            },
          },
          theme: ThemeSupa,
        }}
        providers={["spotify"]}
      />
    </>
  );
}

export default Home;
