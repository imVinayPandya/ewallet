# Copyright 2018 OmiseGO Pte Ltd
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

defmodule EWallet.Bouncer.Dispatcher do
  @moduledoc """
  A permissions dispatcher calling the appropriate actors/targets.
  """
  alias EWallet.Bouncer.{Permission, DispatchConfig}

  def scoped_query(%Permission{schema: schema} = permission, dispatch_config \\ DispatchConfig) do
    dispatch_config.scope_references[schema].scoped_query(permission)
  end

  # Gets all the owner uuids of the given record.
  # Could be user and/or account uuids.
  def get_owner_uuids(record, dispatch_config \\ DispatchConfig) do
    dispatch_config.target_references[record.__struct__].get_owner_uuids(record)
  end

  def authorize_with_attrs(%{schema: schema} = permission, dispatch_config \\ DispatchConfig) do
    dispatch_config.target_references[schema].authorize_with_attrs(permission)
  end

  # Redefines the target type if the given record has subtypes.
  # like transaction_requests -> end_user_transaction_requests /
  # account_transaction_requests.
  def get_target_types(schema, dispatch_config \\ DispatchConfig) do
    IO.inspect(schema)
    IO.inspect(dispatch_config)
    IO.inspect(dispatch_config.target_references)

    dispatch_config.target_references[schema].get_target_types()
  end

  def get_target_type(record, dispatch_config \\ DispatchConfig) do
    dispatch_config.target_references[record.__struct__].get_target_type(record)
  end

  # Returns a query to get all the accounts the actor (a key, an admin user
  # or an end user) has access to
  def get_query_actor_records(%Permission{actor: actor} = permission, dispatch_config \\ DispatchConfig) do
    dispatch_config.target_references[actor.__struct__].get_query_actor_records(permission)
  end

  # Gets all the accounts the actor (a key, an admin user or an end user)
  # has access to.
  def get_actor_accounts(record, dispatch_config \\ DispatchConfig) do
    dispatch_config.target_references[record.__struct__].get_actor_accounts(record)
  end

  # Loads all the accounts that have power over the given record.
  def get_target_accounts(record, dispatch_config \\ DispatchConfig) do
    dispatch_config.target_references[record.__struct__].get_target_accounts(record)
  end
end
