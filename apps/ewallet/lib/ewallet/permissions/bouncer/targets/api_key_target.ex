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

defmodule EWallet.Bouncer.APIKeyTarget do
  @moduledoc """
  A policy helper containing the actual authorization.
  """
  @behaviour EWallet.Bouncer.TargetBehaviour
  alias EWalletDB.{APIKey, Helpers.Preloader}

  @spec get_owner_uuids(APIKey.t()) :: [Ecto.UUID.t()]
  def get_owner_uuids(%APIKey{account_uuid: uuid}) do
    [uuid]
  end

  @spec get_target_types() :: [:api_keys]
  def get_target_types, do: [:api_keys]

  @spec get_target_type(APIKey.t()) :: :api_keys
  def get_target_type(_), do: :api_keys

  @spec get_target_accounts(APIKey.t(), any()) :: [Account.t()]
  def get_target_accounts(%APIKey{} = key, _dispatch_config) do
    [Preloader.preload(key, [:account]).account]
  end
end
