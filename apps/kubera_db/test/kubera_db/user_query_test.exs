defmodule KuberaDB.UserQueryTest do
  use KuberaDB.SchemaCase
  alias KuberaDB.{User, UserQuery}

  describe "UserQuery.where_has_membership/1" do
    test "returns only admins" do
      account = insert(:account)
      role    = insert(:role, %{name: "some_role"})
      admin1  = insert(:admin, %{email: "admin1@omise.co"})
      admin2  = insert(:admin, %{email: "admin2@omise.co"})
      user    = insert(:user, %{email: "user1@omise.co"})

      insert(:membership, %{user: admin1, account: account, role: role})
      insert(:membership, %{user: admin2, account: account, role: role})

      result =
        User
        |> UserQuery.where_has_membership()
        |> Repo.all()

      assert Enum.count(result) == 2
      assert Enum.at(result, 0).email == admin1.email
      assert Enum.at(result, 1).email == admin2.email
      refute Enum.any?(result, fn(admin) -> admin.email == user.email end)
    end

    test "uses `KuberaDB.User` if `queryable` is not given" do
      account = insert(:account)
      role    = insert(:role, %{name: "some_role"})
      admin   = insert(:admin, %{email: "admin@omise.co"})
      insert(:membership, %{user: admin, account: account, role: role})

      query = UserQuery.where_has_membership()
      result = Repo.all(query)

      assert Enum.count(result) == 1
    end
  end
end