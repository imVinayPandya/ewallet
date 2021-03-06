# Copyright 2018-2019 OmiseGO Pte Ltd
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

defmodule EWalletAPI.V1.UserViewTest do
  use EWalletAPI.ViewCase, :v1
  alias Ecto.UUID
  alias EWalletAPI.V1.UserView
  alias EWalletDB.User

  describe "EWalletAPI.V1.UserView.render/2" do
    test "renders user.json with correct structure" do
      user = %User{
        id: UUID.generate(),
        username: "johndoe",
        full_name: "John Doe",
        calling_name: "John",
        provider_user_id: "provider_id_9999",
        metadata: %{
          first_name: "John",
          last_name: "Doe"
        }
      }

      expected = %{
        version: @expected_version,
        success: true,
        data: %{
          object: "user",
          id: user.id,
          socket_topic: "user:#{user.id}",
          provider_user_id: user.provider_user_id,
          username: user.username,
          full_name: user.full_name,
          calling_name: user.calling_name,
          email: user.email,
          enabled: user.enabled,
          avatar: %{
            original: nil,
            large: nil,
            small: nil,
            thumb: nil
          },
          metadata: %{
            first_name: "John",
            last_name: "Doe"
          },
          created_at: nil,
          updated_at: nil,
          encrypted_metadata: %{}
        }
      }

      assert render(UserView, "user.json", user: user) == expected
    end
  end
end
