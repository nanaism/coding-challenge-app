import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "./components/ui/card";
import { Textarea } from "./components/ui/textarea";

function App() {
  return (
    <Card className="w-96">
      <CardHeader>shadcn/uiの表示確認</CardHeader>
      <CardContent>
        <Textarea />
      </CardContent>
      <CardFooter>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  );
}

export default App;
