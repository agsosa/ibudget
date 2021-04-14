/*
  Smart component (Interacting with BudgetModel)

  Higher order component to automatically dispatch BudgetModel/fetchTransactions on mount

  Injected props to children:
    loading: (bool) true if the fetch is in progress, false otherwise

  Usage:
    Wrap a component like any other HoC:
      export default withFetchTransactions(DashboardPage)
*/
import * as React from "react";
import { useDispatch } from "react-redux";

function withFetchTransactions(WrappedComponent) {
  return function (props) {
    const [loading, setLoading] = React.useState(true);
    const dispatch = useDispatch();

    React.useEffect(() => {
      dispatch({
        type: "BudgetModel/fetchTransactions",
        payload: {
          callback: () => {
            setLoading(false);
          },
        },
      });
    }, []);

    return <WrappedComponent {...props} loading={loading} />;
  };
}

export default withFetchTransactions;
