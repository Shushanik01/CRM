import { StrictMode } from "react";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {store} from "app/store";
import App from "./App.jsx";
import "./index.css";

const QueryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
           <QueryClientProvider client={QueryClient}>
            <App/>
           </QueryClientProvider>
        </Provider>
    </StrictMode>
)