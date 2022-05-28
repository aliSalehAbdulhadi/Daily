import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../src/components/Navbar";
import TaskForm from "../src/components/TaskForm";
import TasksContainer from "../src/components/TasksContainer";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title className="bg-red-500">Daily</title>
        <meta name="description" content="Add your daily task" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <TaskForm />
      <TasksContainer />
    </div>
  );
};

export default Home;
