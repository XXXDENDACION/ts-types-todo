// Base type
type TodoID = number;
type Todo = {
  id: TodoID;
  title: string;
  checked: boolean;
};

// Contracts
type Add<
  List extends Todo[],
  Text extends string
> = Helpers.GenerateId<List> extends number
  ? [...List, Helpers.CreateTodo<Text, Helpers.GenerateId<List>>]
  : "Cant add Todo";

type Remove<
  List extends Todo[],
  id extends TodoID,
  ResultList extends Todo[] = []
> = List extends [infer First extends Todo, ...infer Rest extends Todo[]]
  ? First["id"] extends id
    ? Remove<Rest, id, ResultList>
    : Remove<Rest, id, [First, ...ResultList]>
  : ResultList;

type Update<List extends Todo[], NewTodo extends Todo> = [
  ...Remove<List, NewTodo["id"]>,
  NewTodo
];

type ToggleTodo<
  List extends Todo[],
  Id extends TodoID,
  ResultList extends Todo[] = []
> = Utils.ExtendDeep<
  List extends [infer First extends Todo, ...infer Rest extends Todo[]]
    ? First["id"] extends Id
      ? ToggleTodo<
          Rest,
          Id,
          [
            Utils.Merge<
              First,
              { checked: Utils.ToggleBoolean<First["checked"]> }
            >,
            ...ResultList
          ]
        >
      : ToggleTodo<Rest, Id, [First, ...ResultList]>
    : ResultList
>;

type Sort<List, Desc = false, By extends string = "id"> = Helpers.Bubble<
  List,
  Desc,
  By
> extends [...infer F, infer L]
  ? [...Sort<F, Desc>, L]
  : List;