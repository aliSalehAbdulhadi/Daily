import type { NextPage } from "next";
import Head from "next/head";
import Navbar from ".././components/Navbar";
import Form from "../components/Form";
import TasksContainer from "../components/TasksContainer";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title className="bg-red-500">Daily</title>
        <meta name="description" content="Add your daily task" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Form />
      <TasksContainer />
    </div>
  );
};

export default Home;
