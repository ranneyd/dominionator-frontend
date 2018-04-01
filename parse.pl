use strict;
use warnings;

sub makeArray {
  my $liststr = join(",", map { "$_" } split(",", shift));
  return "[$liststr]";
}

my $input = 'data.txt';
my $output = "./src/data.js";
open(my $fhin, '<:encoding(UTF-8)', $input)
  or die "Could not open file '$input' $!";

open(my $fhout, '>', $output) or die "Could not open file '$output' $!";

print $fhout "export default [\n";

while (my $row = <$fhin>) {
  if($row =~ /(\t+)"(Set|Cost|Type|Tags)": (.+),/) {
    my $str;
    my $match = $3;
    if ($match eq "null") {
      $str = "[]";
    } else {
      $match =~ s/,/", "/g;
      $str = "[ $match ]";
    }
    print $fhout "$1\"$2\": $str,\n";
  } else {
    print $fhout $row;
  }
}

print $fhout "];";

close $fhin;
close $fhout;