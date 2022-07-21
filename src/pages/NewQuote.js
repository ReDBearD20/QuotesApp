import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../components/lib/api";

const NewQuote = () => {
  //using programatic navigation we redirect user after adding the comment
  //using history hook we can change and manage url
  const history = useHistory();

  //sendRequest is a callback function it takes data to the useHttp hook
  const { sendRequest, status } = useHttp(addQuote, false);
  useEffect(() => {
    if (status === "completed") history.push("/quotes");
  }, [status, history]);

  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData);
    console.log(quoteData);
  };
  return (
    <QuoteForm isLoading={status === "pending"} onAddQuote={addQuoteHandler} />
  );
};

export default NewQuote;
