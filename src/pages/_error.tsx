function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <p>
      {error
        ? `${error?.message} occurred on server`
        : "An error occurred on client"}
    </p>
  );
}

export default ErrorPage;
