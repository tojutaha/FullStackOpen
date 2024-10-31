import { useMutation } from "@apollo/client";
import { AUTHORIZE } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";
import { useApolloClient } from "@apollo/client";

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
    const [mutate, result] = useMutation(AUTHORIZE);

    const signIn = async ({ username, password }) => {
        const mut = await mutate({ variables: { credentials: { username, password } }});
        // console.log("MUT: ", mut);
        await authStorage.setAccessToken(mut.data.authenticate.accessToken);
        apolloClient.resetStore();
        return mut;
    };

    return [signIn, result];
};

export default useSignIn;