class AddGoogleDirectionsToBranchToBranches < ActiveRecord::Migration[5.0]

    def change
      
     add_column :trips, :google_directions_to_branch, :jsonb, default: '{}'
    end
 
end
