import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/sidebar/messages/MessageContainer";

const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Sidebar />

      <div className="flex-1 overflow-hidden">
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;
