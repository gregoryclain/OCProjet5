// import mockAxios from "jest-mock-axios";
// import axios from 'axios';
import { shallowMount } from "@vue/test-utils";
import Home from "@/views/Home.vue";

describe("Renders content on Home.vue", () => {
  it("renders Home page contains h1", () => {
    const wrapper = shallowMount(Home);
    expect(wrapper.contains("h1")).toBe(true);
  });

  it("renders h1 value is 'Home' on home page", () => {
    const wrapper = shallowMount(Home).find("h1");
    expect(wrapper.text()).toBe("Home");
  });
});

// TODO: test values component
