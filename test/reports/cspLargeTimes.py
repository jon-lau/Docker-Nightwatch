import os
import sys
import argparse


def checkLimit(line, timeLimit):
    words = line.split()
    if "milliseconds." in words:
        timeInd = words.index("milliseconds.") - 1
        if timeLimit < int(words[timeInd]):
            return False
    return True

	
def getTestName(line):
	words = line.split()
	if "Suite" in words:
		return True
	return False
	
	

def parseForTime(filename, timeLimit):
	f = open(filename, 'r')
	currentTest = "No Test Name"
	for line in f:
		if getTestName(line):
			currentTest = line
		if not checkLimit(line, timeLimit):
			print "This line failed"
			print currentTest
			print line
			print "\n\n"
			




if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Find large wait times.")
    parser.add_argument("--filename", help="file to be parsed")
    parser.add_argument("--time", help="time in milliseconds to test for")
    args = parser.parse_args()

    filename = None
    timeLimit = 1000
    if args.filename:
        filename = args.filename

    if not filename:
        print "File name is needed"
    else:
        if args.time:
            timeLimit = int(args.time)

        parseForTime(filename, timeLimit)