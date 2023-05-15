import { User } from "@prisma/client";
import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/sidebar";
import UsersList from "./components/UsersList";

export default async function UserLayouts({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();
  
  return (
    // @ts-expect-error Server Component
    <Sidebar>
        <UsersList items={users as User[]} />
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
