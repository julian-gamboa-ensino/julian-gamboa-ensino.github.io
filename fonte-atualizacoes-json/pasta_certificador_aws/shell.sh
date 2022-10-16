exit 

ls /home/julian/Desktop/ensino-aula-angular-net-2022/apagar/julian-gamboa-ensino.github.io/fonte-atualizacoes-json/pasta_certificador_aws/images/subir_aws | while read line
do
	echo '"'https://cv-julian-2022.s3.us-west-2.amazonaws.com/certificados/$line'",'
done

exit 



exit 

wget https://cv-julian-2022.s3.us-west-2.amazonaws.com/conteudo_pasta/bootcamps.json

cat lista | awk '{print $5}' | while read line
do
	echo $line
done 


exit 

wget https://cv-julian-2022.s3.us-west-2.amazonaws.com/conteudo_pasta/novo.json	

exit 

mkdir apagar


cat lista | awk '{print $5}' | while read line
do
	echo $line 	
	mv ./images/$line ./apagar	
done

exit





ls ./images | cut -d'.' -f1 | sort | uniq | while read line
do
done

exit

ls ./images | cut -d'.' -f1 | sort | uniq | cat -n

exit

aws s3 ls cv-julian-2022/certificados/ | cat -n > lista