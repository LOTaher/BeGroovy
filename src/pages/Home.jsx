import React from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import styles from "./Home.module.css";

const supabase = createClient(
  "https://uktonbtcsnwrpwwsrikr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrdG9uYnRjc253cnB3d3NyaWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcxNjU5ODIsImV4cCI6MTk5Mjc0MTk4Mn0.3o3Xz3XlW_4Kq-375e8DZUALcosQ4Bb874gib7GfAJE"
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
