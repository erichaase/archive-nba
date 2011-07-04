class DataController < ApplicationController
  def index
    # do error checking here
    fromDate = Date.new( params["fromDate"][0,4].to_i, params["fromDate"][4,2].to_i, params["fromDate"][6,2].to_i )
    toDate   = Date.new( params["toDate"][0,4].to_i,   params["toDate"][4,2].to_i,   params["toDate"][6,2].to_i )

    @boxscoreentries = BoxScoreEntry.all

    respond_to do |format|
      format.xml  { render :xml  => @boxscoreentries }
      format.json { render :json => @boxscoreentries }
    end
  end
end
