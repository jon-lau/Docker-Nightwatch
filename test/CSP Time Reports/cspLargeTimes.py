import os
import sys
import argparse

#last build report file name
lastBuildReport = "lastBuildReport.txt"

#Node to represent a test failure
class Node :
    def __init__(self, build, errorMessage, testName, failCount, line):
        #build number
		self.build = build
        #error message received
		self.errorMessage = errorMessage
        #test that fail occurred in
		self.testName = testName
        #number of times this occurrence has failed
		self.failCount = failCount
        #line that failed
		self.line = line

def checkLimit(line, timeLimit):
    words = line.split()
	#find timed response
    if "milliseconds." in words:
        timeInd = words.index("milliseconds.") - 1
			#check if time is within range
        if timeLimit < int(words[timeInd]):
            return False
    return True

#gets latest build number
def getBuildName():
	f = open(jobPath + "nextBuildNumber", 'r')
	for line in f:
		words = line.split()
		buildNumber = int(words[0]) - 1
		buildString = str(buildNumber)
		return buildString
	return "No Build String"

#checks if new test suite has started
def isNewTest(line):
	words = line.split()
	if "Suite" in words:
		return True
	return False

#makes list of last build report
#report contains archive of past failures (lastBuildReport)
def makeLastBuildList():
	buildList = []
	#open history of last build if exists
	if(os.path.isfile(jobPath + lastBuildReport)):
		f = open(jobPath + lastBuildReport, 'r')
	else:
		return buildList
	#create build list
	for line in f:
		if "Build" in line:
			buildName = line.rstrip('\n')
		elif "This response exceeded" in line:
			errorMessage = line.rstrip('\n')
		elif "Test Suite" in line:
			testSuite = line.rstrip('\n')
		elif "Number of times this line has failed" in line:
			failLine = line.rstrip('\n')
			words = failLine.split()
			fail = int(words[7])
		elif "milliseconds" in line:
			errorLine = line.rstrip('\n')
		elif "----------------------------" in line:
			buildList.append(Node(buildName,errorMessage,testSuite,fail,errorLine))
	return buildList

#updates build list, logging new errors & incrementing reoccurring errors
def makeBuildFailList(filename, timeLimit, buildString, Build):
	f = open(jobPath + "builds\\" + buildString + "\log", 'r')
	currentTest = "No Test Name"
	currentSuiteLine = 0
	for line in f:
		#check for new test suite
		if isNewTest(line):
			#first reporting line begins 3 lines after new suite starts
			currentSuiteLine = -3
			currentTest = line.rstrip("\n")
		#check for end of file: failed build
		#(bottom of log file contains summary of overall build failures, prevents double counting of timing failures )
		if "TEST FAILURE:" in line:
			return Build
		#check for failure
		if not checkLimit(line, timeLimit):
			Test = currentTest + " (Line in Jenkins build report: " + str(currentSuiteLine) + ")"
			results = filter(lambda x: x.testName == Test, Build)
			#if fail is reoccurring
			if(results):
				#reoccurring fail -> temp
				temp = results[0]
				Build.remove(results[0])
				temp.build = "Build #" + buildString
				temp.failCount +=  1
				Build.append(temp)
			#if first time fail
			else:
				fail = 1
				build = "Build #" + buildString
				errorMessage = "This response exceeded " + str(timeLimit) + " ms"
				failedLine = line.strip("\n")
				Build.append(Node(build, errorMessage, Test, fail, failedLine))
		currentSuiteLine += 1
	return Build

#prints out failure list
def prettyPrint( build ) :
	#clean up files
	if(os.path.isfile(jobPath + lastBuildReport)):
		os.remove(jobPath + lastBuildReport)
	f = open(jobPath + "REPORT.txt", "w+")
	build.sort(key=lambda x: x.failCount, reverse=True)
	for p in build:
		if p != None :
			f.write(p.build + "\n")
			f.write(p.errorMessage + "\n")
			f.write(p.testName + "\n")
			f.write("Number of times this line has failed: " + str(p.failCount) + "\n")
			f.write(p.line + "\n")
			f.write("----------------------------\n")
	f.close()

if __name__ == '__main__':

	parser = argparse.ArgumentParser(description="Find large wait times.")
	parser.add_argument("--filename", help="file to be parsed")
	parser.add_argument("--time", help="time in milliseconds to test for")
	parser.add_argument("--jobPath", help="path to desired job folder")
	args = parser.parse_args()
	DefaultFileName = "log.txt"
	DefaultTimeLimit = 1000
	DefaultPath = "c:\\"
	if args.filename:
		filename = args.filename
	else:
		filename = DefaultFileName
	if args.time:
		timeLimit = int(args.time)
	else:
		timeLimit = DefaultTimeLimit
	if args.jobPath:
		jobPath = args.jobPath
	else:
		jobPath = DefaultPath
	#get last Build Report as a list
	build = makeLastBuildList()
	#get current build name
	buildName = getBuildName()
	#update build fails list
	build = makeBuildFailList(filename, timeLimit, buildName, build)
	#print results
	prettyPrint(build)
	#clean up files
	os.rename(jobPath + "REPORT.txt", jobPath + lastBuildReport)
