"use client";

import SKGwithAcc from "../components/SKG/WACC";
import SKGwithoutAcc from "../components/SKG/WOACC";
import { isLoggedIn } from "../utils/defaults";

function Home() {
  return isLoggedIn ? <SKGwithAcc /> : <SKGwithoutAcc />;
}

export default Home;
