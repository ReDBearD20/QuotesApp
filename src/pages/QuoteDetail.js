import { useRouteMatch } from "react-router-dom";
import { Route } from "react-router-dom";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import { getSingleQuote } from "../components/lib/api";
import useHttp from "../hooks/use-http";
import { useEffect } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";

// const DUMMY_QUOTES = [
//   { id: "q1", author: "Max", text: "Learning React is fun!" },
//   { id: "q2", author: "payne", text: "Learning java is fun!" },
// ];

const QuoteDetail = () => {
  const params = useParams();
  const match = useRouteMatch();
  //useRouteMatch for avoiding manual path creation so that if we change path sometime
  //we dont have to change path placeholders everywhere
  //console.log(match);
  //console.log(params);
  //const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);
  useEffect(() => {
    sendRequest(params.quoteId);
  }, [sendRequest, params.quoteId]);

  if (status === "pending")
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );

  if (error) return <p className="centered">{error}</p>;

  if (!loadedQuote.text) {
    return <p>No Quote Found!</p>;
  }
  //we used nested route below to manipulate the loading comments link
  return (
    <section>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={`/quotes/${params.quoteId}`} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </section>
  );
};

export default QuoteDetail;
