// import * as ReactQuery from "@tanstack/react-query";
import { screen, waitFor } from "@testing-library/react-native";

import { supabaseRestClient } from "@/services/supabase/client";

import { mockWordsListResponse } from "@/__mocks__/wordsList";
import { renderWithProviders } from "@/utils/tests.utils";

import { AxiosError } from "axios";
import { WordsListScreen } from "../index";

const mockGet = supabaseRestClient.get as jest.Mock;

describe("screens - WordsList", () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it("should fetch words via axios, render the list and match the snapshot", async () => {
    mockGet.mockResolvedValue({ data: mockWordsListResponse });

    const { toJSON } = renderWithProviders(<WordsListScreen />);

    await waitFor(() => {
      expect(mockGet).toHaveBeenCalledWith(
        "/words",
        expect.objectContaining({
          params: expect.objectContaining({ limit: 75, offset: 0 }),
        }),
      );
    });

    await waitFor(() => {
      expect(screen.getAllByText("apple")).toBeDefined();
      expect(screen.getAllByText("lemon")).toBeDefined();
    });

    expect(toJSON()).toMatchSnapshot();
  });

  it("should render the screen loader when the words are loading", async () => {
    const { getByTestId } = renderWithProviders(<WordsListScreen />);

    await waitFor(() => {
      expect(getByTestId("screen-loader-container")).toBeDefined();
    });
  });

  it("should render the screen error when the words fail to load", async () => {
    mockGet.mockRejectedValue(new AxiosError("Failed to load words"));

    const { getByTestId, debug } = renderWithProviders(<WordsListScreen />);

    await waitFor(() => {
      expect(getByTestId("screen-error-container")).toBeDefined();
    });

    debug();
  });
});
