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

defmodule EWallet.Bouncer.ActivityLogTarget do
  @moduledoc """
  The target handler for activity logs.
  """
  @behaviour EWallet.Bouncer.TargetBehaviour
  alias ActivityLogger.ActivityLog

  @spec get_owner_uuids(ActivityLog.t()) :: [Ecto.UUID.t()]
  def get_owner_uuids(activity_log) do
    [activity_log.originator_uuid]
  end

  @spec get_target_types() :: [:activity_logs]
  def get_target_types, do: [:activity_logs]

  @spec get_target_type(ActivityLog.t()) :: :activity_logs
  def get_target_type(_), do: :activity_logs

  @spec get_target_accounts(ActivityLog.t(), any()) :: []
  def get_target_accounts(_activity_log, _dispatch_config), do: []
end
