import AboutUsIndex from "./components/about-us/about-index";
import CommunityIndex from "./components/community-posts/community-index";
import FaqsIndex from "./components/faqs/faqs-index";
import FindMates from "./components/find-mates";
import Hero from "./components/hero";
import MentorIndex from "./components/mentors/mentor-index";
import ServicesIndex from "./components/services/index";
const page = () => {
  return (
    <div>
      <Hero />
      <ServicesIndex />
      <MentorIndex />
      <AboutUsIndex />
      <CommunityIndex />
      <FindMates />
      <FaqsIndex />
    </div>
  );
};

export default page;
