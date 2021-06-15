import "./styles.css";
import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import Auth from "./Auth";
import VMList from "./VMList";

export default function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="container">
      {!session ? <Auth /> : <VMList key={session.user.id} session={session} />}
    </div>
  );
}
