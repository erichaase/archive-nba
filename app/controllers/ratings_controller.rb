require 'open-uri'
require 'date'

# todo
#   Cache-Control: no-cache
#   rails error logging
#   see comments below
#   double-check ALL regular expressions
#   nba team name

class MyError < StandardError
end

class RatingsController < ApplicationController

################################################################################
  RE_PLAYER = %r`\shref\s*=\s*"([^"]+)"\s*>([^<]+)<[^>]+>\s*,\s*([^<]+)<[^<]+((<\s*td[^>]*>[^<]+<\s*/\s*td\s*>\s*)+)`
################################################################################

  def index

    BoxScoreEntry.all.each { |x| x.delete }
    params = {
      :url    => "http://espn.go.com/nba/boxscore?gameId=301225013", 
      :date   => Date.new(2010,12,25),
      :source => "espn"
    }
    boxScoreNew(params).each { |x| x.save }

################################################################################

    # do error checking here
    #fromDate = Date.new( params["fromDate"][0,4].to_i, params["fromDate"][4,2].to_i, params["fromDate"][6,2].to_i )
    #toDate   = Date.new( params["toDate"][0,4].to_i,   params["toDate"][4,2].to_i,   params["toDate"][6,2].to_i )

    # @boxscoreentries = BoxScoreEntry.where(:lname => 'james')
    # SQL BETWEEN operator:
    #   Student.where(:grade => 9..12)
    # SQL IN operator:
    #   Student.where(:grade => [9,11,12])
    @boxscoreentries = BoxScoreEntry.all

    respond_to do |format|
      format.xml  { render :xml  => @boxscoreentries }
      format.json { render :json => @boxscoreentries }
    end
  end

  # examples
  #   <tr align="right" class="odd player-46-130"><td style="text-align:left;" nowrap><a href="http://espn.go.com/nba/player/_/id/130/brian-cardinal">Brian Cardinal</a>, PF</td><td>12</td><td>1-1</td><td>1-1</td><td>0-0</td><td>0</td><td>0</td><td>0</td><td>1</td><td>0</td><td>0</td><td>1</td><td>2</td><td>+18</td><td>3</td></tr>
  #   <tr align="right" class="even player-46-1966"><td style="text-align:left;" nowrap><a href="http://espn.go.com/nba/player/_/id/1966/lebron-james">LeBron James</a>, SF</td><td>40</td><td>9-15</td><td>2-5</td><td>1-4</td><td>1</td><td>3</td><td>4</td><td>6</td><td>1</td><td>1</td><td>6</td><td>2</td><td>-24</td><td>21</td></tr>
  def boxScoreNew ( params )
    raise ArgumentError, "'params' argument is not a hash"                 unless params.class == Hash
    raise ArgumentError, "'params' hash argument doesn't have :uri key"    unless params.has_key?(:url)
    raise ArgumentError, "'params' hash argument doesn't have :date key"   unless params.has_key?(:date)
    raise ArgumentError, "'params' hash argument doesn't have :source key" unless params.has_key?(:source)
    raise ArgumentError, "'params[:url]' argument isn't a String"          unless params[:url].class == String
    raise ArgumentError, "'params[:date]' argument isn't a Date"           unless params[:date].class == Date
    raise ArgumentError, "'params[:source]' argument isn't a String"       unless params[:source].class == String

    @url    = params[:url]
    @date   = params[:date]
    @source = params[:source]
    @html   = open(@url).read

    @boxScoreEntries = []
    # put the following in a function?
    @html.scan(RE_PLAYER) { |href, name, pos, rest|
      stats = rest.split(%r`\s*<\s*/\s*td\s*>\s*<\s*td[^>]*>\s*`)

      if stats.size >= 1
        stats[0].sub!(%r`^\s*<\s*td[^>]*>\s*`,'')
        stats[-1].sub!(%r`\s*<\s*/\s*td\s*>\s*$`,'')
      end

      [href, name, pos].concat(stats).each { |x| x.strip!; x.downcase! }

      case stats.size
      when 1
        # message stored in stats[0]
        #   'dnp coach's decision'
        #   not entered game
        #   etc.
      when 13..14
        # assertions
        #   data types
        #   nulls

        bse = {}
        bse[:espn_id]  = href.scan(/\/id\/(\d+)\//)[0][0].to_i
        bse[:fname]    = name[/^\S+/]
        bse[:lname]    = name[/\S+$/]
        bse[:team]     = ''
        bse[:pos]      = pos
        bse[:min]      = stats[0].to_i
        bse[:fgm]      = stats[1][/^\d+/].to_i
        bse[:fga]      = stats[1][/\d+$/].to_i
        bse[:tpm]      = stats[2][/^\d+/].to_i
        bse[:tpa]      = stats[2][/\d+$/].to_i
        bse[:ftm]      = stats[3][/^\d+/].to_i
        bse[:fta]      = stats[3][/\d+$/].to_i
        bse[:oreb]     = stats[4].to_i
        bse[:verified] = false

        case stats.size
          when 14
            bse[:dreb]      = stats[5].to_i
            bse[:reb]       = stats[6].to_i
            bse[:ast]       = stats[7].to_i
            bse[:stl]       = stats[8].to_i
            bse[:blk]       = stats[9].to_i
            bse[:to]        = stats[10].to_i
            bse[:pf]        = stats[11].to_i
            bse[:plusminus] = stats[12].to_i
            bse[:pts]       = stats[13].to_i
          when 13
            bse[:dreb]      = nil
            bse[:reb]       = stats[5].to_i
            bse[:ast]       = stats[6].to_i
            bse[:stl]       = stats[7].to_i
            bse[:blk]       = stats[8].to_i
            bse[:to]        = stats[9].to_i
            bse[:pf]        = stats[10].to_i
            bse[:plusminus] = stats[11].to_i
            bse[:pts]       = stats[12].to_i

        end

        @boxScoreEntries << BoxScoreEntry.new(bse)

      else
        warn "size of 'stats' is #{stats.size}, should be 1, 13 or 14: #{stats.inspect}"
      end
    }

    return @boxScoreEntries

  end

end
