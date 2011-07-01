class CreateBoxScoreEntries < ActiveRecord::Migration
  def self.up
    create_table :box_score_entries do |t|
      t.integer :espn_id
      t.string :fname
      t.string :lname
      t.string :team
      t.string :pos
      t.integer :min
      t.integer :fgm
      t.integer :fga
      t.integer :tpm
      t.integer :tpa
      t.integer :ftm
      t.integer :fta
      t.integer :oreb
      t.integer :dreb
      t.integer :reb
      t.integer :ast
      t.integer :stl
      t.integer :blk
      t.integer :to
      t.integer :pf
      t.string :plusminus
      t.integer :pts
      t.boolean :verified

      t.timestamps
    end
  end

  def self.down
    drop_table :box_score_entries
  end
end
