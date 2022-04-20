
ls | while read line
do
	mv ../$line .
done

ls *.jp*| cat -n
