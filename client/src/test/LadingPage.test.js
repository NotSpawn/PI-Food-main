import Landing from "../components/LandingPage/Landing";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });

describe("Landing", () => {
  it("should have a title", () => {
    const wrapper = shallow(<Landing />);
    const title = wrapper.find("div h1");
    expect(title.text()).toBe("Henry Food PI");
  });
  it("should have a button", () => {
    const wrapper = shallow(<Landing />);
    const button = wrapper.find("div Link button");
    expect(button.text()).toBe("Try it");
  });
});
